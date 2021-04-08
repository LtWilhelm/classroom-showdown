# classroom-showdown

## Deploy process
1. Commit and push
2. SSH into vps
3. Pull code onto vps
4. If front-end changes => `$ cd client && npm i && npm run build`
5. If back-end changes => `$ sudo systemctl restart showdown-server`
6. Verify updates work

### Service location
`/etc/systemd/system/showdown-server.service`

### Deno executable location
`/root/.deno/bin`
