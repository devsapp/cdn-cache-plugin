# 使用说明
## 缓存刷新
```
actions:
  pre-deploy:
    - plugin: cdn-cache-plugin
      args:
        operateType: refresh
        objectPath: https://www.aliyun.com/
```
## 缓存预热
```
actions:
  pre-deploy:
    - plugin: cdn-cache-plugin
      args:
        operateType: push
        objectPath: https://www.aliyun.com/
```