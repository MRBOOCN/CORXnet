module.exports = function (self) {
	return [
		// 开关1 - 切换
		{
			type: 'button',
			category: '开关控制',
			name: '开关1 - 切换',
			style: {
				text: 'CX-1',
				size: '18',
				color: 0xffffff,
				bgcolor: 0x000000
			},
			steps: [
				{
					down: [
						{
							actionId: 'switch_control',
							options: {
								switch: 'A01',
								action: 'toggle',
								delay: 0
							}
						}
					],
					up: []
				}
			],
			feedbacks: [
				{
					feedbackId: 'switch_state',
					options: {
						switch: 'A01'
					},
					style: {
						bgcolor: 0x00c000
					}
				}
			]
		},
		// 开关2 - 切换
		{
			type: 'button',
			category: '开关控制',
			name: '开关2 - 切换',
			style: {
				text: 'CX-2',
				size: '18',
				color: 0xffffff,
				bgcolor: 0x000000
			},
			steps: [
				{
					down: [
						{
							actionId: 'switch_control',
							options: {
								switch: 'A02',
								action: 'toggle',
								delay: 0
							}
						}
					],
					up: []
				}
			],
			feedbacks: [
				{
					feedbackId: 'switch_state',
					options: {
						switch: 'A02'
					},
					style: {
						bgcolor: 0x00c000
					}
				}
			]
		},
		// 开关3 - 切换
		{
			type: 'button',
			category: '开关控制',
			name: '开关3 - 切换',
			style: {
				text: 'CX-3',
				size: '18',
				color: 0xffffff,
				bgcolor: 0x000000
			},
			steps: [
				{
					down: [
						{
							actionId: 'switch_control',
							options: {
								switch: 'A03',
								action: 'toggle',
								delay: 0
							}
						}
					],
					up: []
				}
			],
			feedbacks: [
				{
					feedbackId: 'switch_state',
					options: {
						switch: 'A03'
					},
					style: {
						bgcolor: 0x00c000
					}
				}
			]
		},
		// 开关4 - 切换
		{
			type: 'button',
			category: '开关控制',
			name: '开关4 - 切换',
			style: {
				text: 'CX-4',
				size: '18',
				color: 0xffffff,
				bgcolor: 0x000000
			},
			steps: [
				{
					down: [
						{
							actionId: 'switch_control',
							options: {
								switch: 'A04',
								action: 'toggle',
								delay: 0
							}
						}
					],
					up: []
				}
			],
			feedbacks: [
				{
					feedbackId: 'switch_state',
					options: {
						switch: 'A04'
					},
					style: {
						bgcolor: 0x00c000
					}
				}
			]
		}
	]
}
