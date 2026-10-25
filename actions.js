const { SWITCHES, SWITCH_STATE_ON, SWITCH_STATE_OFF } = require('./constants')

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
					choices: SWITCHES.map((s) => ({ id: s.id, label: s.label })),
					default: SWITCHES[0].id,
				},
				{
					id: 'action',
					type: 'dropdown',
					label: '操作',
					width: 6,
					choices: [
						{ id: 'on', label: '打开' },
						{ id: 'off', label: '关闭' },
						{ id: 'toggle', label: '切换' },
					],
					default: 'on',
				},
				{
					id: 'delay',
					type: 'number',
					label: '延时 (ms)',
					width: 6,
					min: 0,
					max: 30000,
					default: 0,
					step: 100,
				},
			],
			callback: async (event) => {
				const { switch: switchId, action, delay } = event.options
				const command = { res: '123' }

				let targetAction = action

				// 切换操作：根据当前状态决定打开或关闭
				if (action === 'toggle') {
					const currentState = self.deviceState[switchId] || 0
					targetAction = currentState === 1 ? 'off' : 'on'
				}

				command[switchId] = targetAction === 'on' ? SWITCH_STATE_ON : SWITCH_STATE_OFF

				// 延迟发送或立即发送
				if (delay && delay > 0) {
					setTimeout(() => {
						self.sendCommand(command)
					}, delay)
				} else {
					self.sendCommand(command)
				}
			},
		},

		// 读取所有设备状态（补齐文档中已声明但此前缺失的动作）
		read_all_status: {
			name: '读取所有状态',
			description: '向设备请求一次完整的状态上报',
			options: [],
			callback: async () => {
				self.readAllStatus()
			},
		},
	})
}
