/**
 * CORXnet 模块共享常量
 *
 * 作为开关列表、命令字、协议前缀的「单一数据源」，
 * 避免在各功能模块（actions / feedbacks / presets）间重复硬编码。
 */

// 可控开关：A01-A04 对应开关1-4
const SWITCHES = [
	{ id: 'A01', label: '开关1' },
	{ id: 'A02', label: '开关2' },
	{ id: 'A03', label: '开关3' },
	{ id: 'A04', label: '开关4' },
]

// 设备命令字：打开 / 关闭
const SWITCH_STATE_ON = 110000
const SWITCH_STATE_OFF = 100000

// 设备状态上报帧前缀（实际帧格式为：'<PREFIX>' + JSON）
const RESPONSE_PREFIX = '4'

module.exports = {
	SWITCHES,
	SWITCH_STATE_ON,
	SWITCH_STATE_OFF,
	RESPONSE_PREFIX,
}
