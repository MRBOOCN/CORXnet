module.exports = function (self) {
	self.setActionDefinitions({
		// 统一开关控制
		switch_control: {
			name: '开关控制',
			options: [
				{
					id: 'switch',
					type: 'dropdown',
					label: '开关',
					width: 6,
					choices: [
						{ id: 'A01', label: '开关1' },
						{ id: 'A02', label: '开关2' },
						{ id: 'A03', label: '开关3' },
						{ id: 'A04', label: '开关4' }
					],
					default: 'A01'
				},
				{
					id: 'action',
					type: 'dropdown',
					label: '动作',
					width: 6,
					choices: [
						{ id: 'on', label: '打开' },
						{ id: 'off', label: '关闭' }
					],
					default: 'on'
				},
				{
					id: 'delay',
					type: 'number',
					label: '延时 (ms)',
					width: 6,
					min: 0,
					max: 30000,
					default: 0,
					step: 100
				}
			],
			callback: async (event) => {
				const { switch: switchId, action, delay } = event.options
				const command = { res: '123' }
				
				if (action === 'on') {
					command[switchId] = 110000
				} else {
					command[switchId] = 100000
				}
				
				if (delay && delay > 0) {
					self.log('debug', `延迟命令执行 ${delay}ms`)
					setTimeout(() => {
						self.sendCommand(command)
					}, delay)
				} else {
					self.sendCommand(command)
				}
			},
		},

		// 读取所有状态
		read_all_status: {
			name: '读取所有状态',
			options: [],
			callback: async (event) => {
				self.readAllStatus()
			},
		},
	})
}
