let os = require("os");

// 获取本地WiFi的IPv4地址
function getIPAddress() {
	let wlan = os.networkInterfaces().WLAN;
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
