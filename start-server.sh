#!/bin/bash

# 启动局域网HTTP服务器脚本

echo "========================================="
echo "  启动文旅简历网站局域网服务器"
echo "========================================="
echo ""

# 获取本机IP地址
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
PORT=8888

echo "📡 正在启动服务器..."
echo ""
echo "✅ 服务器启动成功！"
echo ""
echo "🌐 访问地址："
echo "   本机访问: http://localhost:$PORT/"
echo "   局域网访问: http://$IP:$PORT/"
echo ""
echo "📱 手机访问："
echo "   1. 确保手机与电脑在同一WiFi网络"
echo "   2. 在手机浏览器输入: http://$IP:$PORT/"
echo ""
echo "🛑 按 Ctrl+C 停止服务器"
echo "========================================="
echo ""

# 启动服务器
python3 -m http.server $PORT --bind 0.0.0.0