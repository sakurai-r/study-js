タスクが停止すると、ECS はそのタスク内の各コンテナに停止シグナルを送信します。現在、ECS は必ず SIGTERM を送信しますが、将来的には Dockerfile やタスク定義に STOPSIGNAL ディレクティブを追加することで、これをオーバーライドできるようにする予定です。この停止シグナルは、シャットダウンの命令をアプリケーションに通知します。


[ECS のアプリケーションを正常にシャットダウンする方法](https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/)
