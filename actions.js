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
					label: '操作',
					width: 6,
					choices: [
						{ id: 'on', label: '打开' },
						{ id: 'off', label: '关闭' },
						{ id: 'toggle', label: '切换' }
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
				
				let targetAction = action
				
				// 切换操作：根据当前状态决定打开或关闭
				if (action === 'toggle') {
					const currentState = self.deviceState[switchId] || 0
					targetAction = currentState === 1 ? 'off' : 'on'
				}
				
				// 设置命令值
				command[switchId] = targetAction === 'on' ? 110000 : 100000
				
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

	})
}
