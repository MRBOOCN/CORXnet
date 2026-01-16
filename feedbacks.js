const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		// 开关1反馈
		switch1_state: {
			name: '开关1状态',
			type: 'boolean',
			label: '开关1状态',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0), // 关闭时为红色
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: (feedback) => {
				return self.deviceState.A01 === 1
			},
		},

		// 开关2反馈
		switch2_state: {
			name: '开关2状态',
			type: 'boolean',
			label: '开关2状态',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0), // 关闭时为红色
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: (feedback) => {
				return self.deviceState.A02 === 1
			},
		},

		// 开关3反馈
		switch3_state: {
			name: '开关3状态',
			type: 'boolean',
			label: '开关3状态',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0), // 关闭时为红色
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: (feedback) => {
				return self.deviceState.A03 === 1
			},
		},

		// 开关4反馈
		switch4_state: {
			name: '开关4状态',
			type: 'boolean',
			label: '开关4状态',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0), // 关闭时为红色
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: (feedback) => {
				return self.deviceState.A04 === 1
			},
		},
	})
}
