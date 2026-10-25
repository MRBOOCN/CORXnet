const { combineRgb } = require('@companion-module/base')
const { SWITCHES } = require('./constants')

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
					choices: SWITCHES.map((s) => ({ id: s.id, label: s.label })),
					default: SWITCHES[0].id,
				},
			],
			callback: (feedback) => {
				const switchId = feedback.options.switch
				return self.deviceState[switchId] === 1
			},
		},
	})
}
