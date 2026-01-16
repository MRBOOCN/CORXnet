const { InstanceBase, InstanceStatus, runEntrypoint, TCPHelper, UDPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

const REGEX_IP_OR_HOST = '/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]))$/'

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.socket = null
		this.udp = null
		this.buffer = ''
		this.deviceState = {
			A01: 0,
			A02: 0,
			A03: 0,
			A04: 0,
			B01: 0,
			B02: 0,
			A96: 1,
			A97: 1
		}
	}

	async init(config) {
		this.config = config

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		await this.configUpdated(config)
	}

	async destroy() {
		this.log('debug', 'destroy')
		if (this.socket) {
			this.socket.destroy()
		} else if (this.udp) {
			this.udp.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	async configUpdated(config) {
		if (this.udp) {
			this.udp.destroy()
			delete this.udp
		}

		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.config = config

		if (this.config.prot == 'tcp') {
			this.init_tcp()
		} else if (this.config.prot == 'udp') {
			this.init_udp()
		}
	}

	// 返回Web配置的配置字段
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: '目标主机名或IP',
				width: 8,
				regex: REGEX_IP_OR_HOST,
			},
			{
				type: 'textinput',
				id: 'port',
				label: '目标端口',
				width: 4,
				default: 50000,
				regex: /^\d+$/,
			},
			{
				type: 'dropdown',
				id: 'prot',
				label: '使用TCP/UDP连接',
				default: 'tcp',
				choices: [
					{ id: 'tcp', label: 'TCP' },
					{ id: 'udp', label: 'UDP' }
				],
			},
			{
				type: 'checkbox',
				id: 'saveresponse',
				label: '保存TCP响应',
				default: false,
				isVisible: (configValues) => configValues.prot === 'tcp',
			},
			{
				type: 'dropdown',
				id: 'convertresponse',
				label: '转换TCP响应格式',
				default: 'none',
				choices: [
					{ id: 'none', label: '不转换' },
					{ id: 'hex', label: '转为十六进制' },
					{ id: 'string', label: '转为字符串' },
				],
				isVisible: (configValues) => configValues.prot === 'tcp' && !!configValues.saveresponse,
			},
		]
	}

	init_udp() {
		if (this.udp) {
			this.udp.destroy()
			delete this.udp
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.udp = new UDPHelper(this.config.host, this.config.port)
			this.updateStatus(InstanceStatus.Ok)

			this.udp.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				this.log('error', 'Network error: ' + err.message)
			})

			this.udp.on('listening', () => {
				this.updateStatus(InstanceStatus.Ok)
			})

			this.udp.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	init_tcp() {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				this.log('error', '网络错误: ' + err.message)
			})

			this.socket.on('data', (data) => {
				this.buffer += data.toString()
				this.processBuffer()

				if (this.config.saveresponse) {
					let dataResponse = data

					if (this.config.convertresponse == 'string') {
						dataResponse = data.toString()
					} else if (this.config.convertresponse == 'hex') {
						dataResponse = data.toString('hex')
					}

					this.setVariableValues({ tcp_response: dataResponse })
				}
			})

			this.readAllStatus()
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	// 处理接收到的数据
	processBuffer() {
		while (this.buffer.length > 0) {
			const endIndex = this.buffer.indexOf('}')
			if (endIndex === -1) break

			const message = this.buffer.substring(0, endIndex + 1)
			this.buffer = this.buffer.substring(endIndex + 1)

			if (message.startsWith('4')) {
				try {
					const data = JSON.parse(message.substring(1))
					this.updateDeviceState(data)
				} catch (error) {
					this.log('error', `解析反馈失败: ${error.message}`)
				}
			}
		}
	}

	// 更新设备状态
	updateDeviceState(data) {
		if (data.A01 !== undefined) this.deviceState.A01 = data.A01
		if (data.A02 !== undefined) this.deviceState.A02 = data.A02
		if (data.A03 !== undefined) this.deviceState.A03 = data.A03
		if (data.A04 !== undefined) this.deviceState.A04 = data.A04
		if (data.B01 !== undefined) this.deviceState.B01 = data.B01
		if (data.B02 !== undefined) this.deviceState.B02 = data.B02
		if (data.A96 !== undefined) this.deviceState.A96 = data.A96
		if (data.A97 !== undefined) this.deviceState.A97 = data.A97

		this.checkFeedbacks()
	}

	// 发送命令到设备
	sendCommand(command) {
		if (this.config.prot == 'tcp') {
			if (!this.socket || !this.socket.isConnected) {
				this.log('error', '未连接到设备')
				return false
			}

			try {
				const cmdString = JSON.stringify(command)
				this.socket.send(cmdString)
				this.log('debug', `已发送命令: ${cmdString}`)
				return true
			} catch (error) {
				this.log('error', `发送命令失败: ${error.message}`)
				return false
			}
		} else if (this.config.prot == 'udp') {
			if (!this.udp) {
				this.log('error', '未连接到设备')
				return false
			}

			try {
				const cmdString = JSON.stringify(command)
				this.udp.send(cmdString)
				this.log('debug', `已发送命令: ${cmdString}`)
				return true
			} catch (error) {
				this.log('error', `发送命令失败: ${error.message}`)
				return false
			}
		}
		return false
	}

	// 读取所有设备状态
	readAllStatus() {
		this.sendCommand({ readall: true, res: '123' })
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
