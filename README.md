# companion-module-bob-corxnet

## 模块简介

CORXnet模块是一个Bitfocus Companion插件，用于控制CORXnet设备的开关功能。该模块提供了直观的用户界面和稳定的连接机制，支持TCP和UDP协议。

## 核心功能

- **统一开关控制**：通过单一控制键组件实现所有开关功能
- **延时操作**：支持自定义延时时间，默认值为0毫秒
- **TCP/UDP连接**：支持TCP和UDP协议连接设备
- **实时状态反馈**：提供开关状态的实时反馈
- **完整的配置选项**：包括IP/端口设置、协议选择、响应处理等

## 使用方法

1. **添加模块实例**：在Companion中添加Bob CORXnet模块
2. **配置连接参数**：
   - 输入设备的IP地址或主机名
   - 输入设备的端口号（默认：50000）
   - 选择连接协议（TCP/UDP）
3. **添加开关控制动作**：
   - 选择要控制的开关（开关1-4）
   - 选择要执行的动作（打开/关闭）
   - 设置延时时间（可选，默认为0）
4. **添加状态反馈**：为按钮添加开关状态反馈

## 关键特性

- **直观易用的用户界面**：清晰的功能选择和状态指示
- **稳定的连接机制**：使用TCPHelper和UDPHelper管理连接
- **灵活的延时控制**：支持0-30000毫秒的延时设置
- **完整的错误处理**：实现了与参考模块一致的错误处理机制
- **实时状态监控**：通过变量和反馈实时监控设备状态

## 注意事项

- 确保设备网络连接正常，IP地址和端口设置正确
- 选择正确的连接协议（TCP/UDP）
- 对于延时操作，请注意延时时间不宜过长，以免影响用户体验
- 如遇到连接问题，请检查设备防火墙设置

## 本地打包

本模块使用 Bitfocus Companion 官方构建工具 `@companion-module/tools` 打包。

**一键打包（推荐）**：在模块根目录双击 `Build.bat`（或在 cmd 中运行 `Build.bat`）即可完成打包。脚本会在打包前自动检查并补齐缺失项，无需人工确认：Node.js / npm 环境、`package.json` 的 `package` 打包脚本、`HELP.md` / `README.md`、误配的 `*.tgz` 通配忽略规则，以及 `node_modules` 与 `@companion-module/tools` / `@companion-module/base` 依赖；打包结束后校验并打印本次生成的 `*.tgz` 产物。失败时以非零码退出并打印原因。

命令行手动打包（备查）：

1. 安装依赖：
   ```bash
   yarn install
   ```

2. 执行打包，生成可导入 Companion 的 `*.tgz`：
   ```bash
   yarn package
   ```

3. 打包产物为 `companion-module-Bob-CORXnet-<version>.tgz`（由 `manifest.json` 的 `id` 与 `version` 派生），
   即最终可分发的模块文件，**须随仓库一并提交**。

> 依赖说明：`@companion-module/base` 为运行时依赖，`@companion-module/tools` 仅用于构建。
> 若模块使用其他构建脚本，`Build.bat` 会从 `scripts.build` / `scripts.dist` 派生 `scripts.package`。

## 版本信息

- 版本：1.1.3
- 发布日期：2026-10-25

## 许可证

MIT License

查看 [HELP.md](./companion/HELP.md) 和 [LICENSE](./LICENSE) 获取更多信息。
