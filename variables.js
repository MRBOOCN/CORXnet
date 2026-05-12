module.exports = function (self) {
	// 定义开关状态变量
	self.setVariableDefinitions([
		{ variableId: 'switch1_state', name: '开关1状态' },
		{ variableId: 'switch2_state', name: '开关2状态' },
		{ variableId: 'switch3_state', name: '开关3状态' },
		{ variableId: 'switch4_state', name: '开关4状态' },
	])

	// 保存原始的 updateDeviceState 方法
	const originalUpdateDeviceState = self.updateDeviceState

	// 重写 updateDeviceState，在更新状态后同步更新变量
	self.updateDeviceState = function(data) {
		// 调用原始方法更新 deviceState 和触发反馈
		originalUpdateDeviceState.call(self, data)
		
		// 同步更新变量值
		self.setVariableValues({
			switch1_state: self.deviceState.A01,
			switch2_state: self.deviceState.A02,
			switch3_state: self.deviceState.A03,
			switch4_state: self.deviceState.A04,
		})
	}
}
