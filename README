# Plugin
WebRTC adapter: https://github.com/webrtcHacks/adapter

# 本地測試
1. Run SRS
```
CANDIDATE="0.0.0.0"
docker run --rm -it -p 1935:1935 -p 1985:1985 -p 8080:8080 \
    --env CANDIDATE=$CANDIDATE -p 8000:8000/udp \
    ossrs/srs:5 ./objs/srs -c conf/rtmp2rtc.conf
```

2. Run OBS
- 選擇WHIP作為Service
- 推流網址: http://localhost:1985/rtc/v1/whip/?app=live&stream=livestream
- 拉流網址: http://localhost:1985/rtc/v1/whep/?app=live&stream=livestream



# 參考文章:
https://ossrs.net/lts/zh-cn/blog/Experience-Ultra-Low-Latency-Live-Streaming-with-OBS-WHIP