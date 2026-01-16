module.exports = function (self) {
	self.setVariableDefinitions([
		{ variableId: 'switch1_state', name: '开关1状态' },
		{ variableId: 'switch2_state', name: '开关2状态' },
		{ variableId: 'switch3_state', name: '开关3状态' },
		{ variableId: 'switch4_state', name: '开关4状态' },
	])

	// 定期更新变量
	setInterval(() => {
		self.setVariableValues({
			switch1_state: self.deviceState.A01,
			switch2_state: self.deviceState.A02,
			switch3_state: self.deviceState.A03,
			switch4_state: self.deviceState.A04,
		})
	}, 1000)
}
