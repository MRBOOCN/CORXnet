const { SWITCHES } = require('./constants')

module.exports = function (self) {
	return SWITCHES.map((s, index) => ({
		type: 'button',
		category: '开关控制',
		name: `${s.label} - 切换`,
		style: {
			text: `CX-${index + 1}`,
			size: '18',
			color: 0xffffff,
			bgcolor: 0x000000,
		},
		steps: [
			{
				down: [
					{
						actionId: 'switch_control',
						options: {
							switch: s.id,
							action: 'toggle',
							delay: 0,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'switch_state',
				options: {
					switch: s.id,
				},
				style: {
					bgcolor: 0x00c000,
					color: 0x000000,
				},
			},
		],
	}))
}
