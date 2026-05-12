const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		// 统一开关状态反馈
		switch_state: {
			name: '开关状态',
			type: 'boolean',
			label: '开关状态',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0), // 默认关闭状态为红色
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'switch',
					type: 'dropdown',
					label: '开关',
					width: 12,
					choices: [
						{ id: 'A01', label: '开关1' },
						{ id: 'A02', label: '开关2' },
						{ id: 'A03', label: '开关3' },
						{ id: 'A04', label: '开关4' }
					],
					default: 'A01'
				}
			],
			callback: (feedback) => {
				const switchId = feedback.options.switch
				return self.deviceState[switchId] === 1
			},
		}
	})
}
