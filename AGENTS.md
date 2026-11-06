# AGENTS.md — 项目工作规则

## 核心规则

- **最小修复**：不建补丁、不引入过度容错，保持简洁可维护。
- **文档同步**：规则/架构/边界变更更新本文档；任何版本/变更流水只写入 [CHANGELOG.md](CHANGELOG.md)（格式与追加位置以该文件的表头说明为准），本文档严禁内嵌版本表或变更流水，末尾「版本记录」小节仅作引用。
- **逐步提交**：每完成一步操作，主动创建对应的 Git 提交记录（commit 写入同一 `.git`，GitHub Desktop 刷新后即可见）；提交信息（commit message）使用中文。

## 项目概览

这是一个 Bitfocus Companion 模块（`companion-module-Bob-CORXnet`），用于控制 CORXnet 设备的开关（A01-A04 对应开关1-4）。支持 TCP / UDP 两种连接，设备状态以 `4{JSON}` 帧上报。

## 架构与边界

- **入口**：`main.js`（实例生命周期、连接、数据解析）；`companion/manifest.json` 声明模块元数据。
- **功能模块**：`actions.js`（动作）、`feedbacks.js`（反馈）、`variables.js`（变量）、`presets.js`（预设）、`upgrades.js`（升级脚本）。
- **单一数据源**：`constants.js` 集中定义开关列表（`SWITCHES`）、命令字（`SWITCH_STATE_ON/OFF`）与上报帧前缀（`RESPONSE_PREFIX`）；新增/调整开关时只改此文件。
- **协议约定**：开关命令下发 `{ res:'123', <开关ID>: 110000|100000 }`；状态上报帧以字符 `4` 开头，其后为 JSON 负载；`B01/B02/A96/A97` 为设备附加状态字段，当前仅存储不对外暴露。
- **UDP 约束**：UDP 为无连接，状态反馈同样依赖设备回送的 `4{JSON}` 帧（模块已统一在 `handleIncomingData` 中处理 TCP 与 UDP 入站数据）。
- **变量约定**：`switch1_state`..`switch4_state` 与文档一致；`tcp_response` 仅在开启「保存TCP响应」时填充。


## 已知约定与边界

- **版本号**：以 `package.json` 为唯一来源，`npm version` / `yarn version` 会经 `syncVersions.js` 自动同步至 `companion/manifest.json`。
- **可分发产物**：`companion-module-*.tgz` 为最终分发产物，**必须随仓库提交**；`.gitignore` 严禁添加 `*.tgz` 通配忽略规则。`/pkg`、`/pkg.tgz` 等构建中间产物仍可忽略。
## 版本记录

见 [CHANGELOG.md](CHANGELOG.md)。