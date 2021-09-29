let os = require("os");

// 获取本地WiFi的IPv4地址
function getIPAddress() {
	let wlan
	const networkInterfaces = os.networkInterfaces()
	let defaultWLAN = networkInterfaces.WLAN;
	if(defaultWLAN){
		wlan = defaultWLAN
	}else{
		// 兼容外置网卡的情形
		wlan = networkInterfaces['WLAN 2']
	}
	for (let i = 0; i < wlan.length; i++) {
		let alias = wlan[i];
		if (
			alias.family === "IPv4" &&
			alias.address !== "127.0.0.1" &&
			!alias.internal
		) {
			return alias.address;
		}
	}
}

module.exports = getIPAddress
