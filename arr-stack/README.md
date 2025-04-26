wireguard config example: ignore local address (not needed if using `gluetun`)
```
PreUp = ip route del 138.199.60.2/32 via 192.168.0.1 dev enp5s0 2>/dev/null || true; ip route add 138.199.60.2/32 via 192.168.0.1 dev enp5s0
PostDown = ip route del 138.199.60.2/32 via 192.168.0.1 dev enp5s0 2>/dev/null || true
```

`/etc/netbird/config.json`:

"CustomDNSAddress": "127.0.0.1:5053"

