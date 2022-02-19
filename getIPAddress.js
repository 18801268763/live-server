let os = require("os");

// 获取本地WiFi的IPv4地址
function getIPAddress() {
	let wlan
	const networkInterfaces = os.networkInterfaces()
	// S740-默认WiFi网卡
	let defaultWLAN = networkInterfaces['WLAN'];

	// 兼容外置网卡的情形
	let externalNetwork = networkInterfaces['WLAN 2']

	// 兼容VMware15Pro中的CentOS7网卡
	let centOSNetwork = networkInterfaces['ens33']

	// 兼容Apple Mac mini M1的默认网卡
	let appleMacMiniNetwork = networkInterfaces['en1']

	// 兼容无影云电脑Ubuntu系统的内网网卡
	let ubuntuNetwork0 = networkInterfaces['eth0']

	// 兼容无影云电脑Ubuntu系统的内网网卡
	let ubuntuNetwork1 = networkInterfaces['eth1']

	if(defaultWLAN){
		wlan = defaultWLAN
	}else if(externalNetwork){
		wlan = externalNetwork
	} else if (centOSNetwork) {
		wlan = centOSNetwork
	} else if (appleMacMiniNetwork) {
		wlan = appleMacMiniNetwork
	} else if (ubuntuNetwork0) {
		wlan = ubuntuNetwork0
	} else if (ubuntuNetwork1) {
		wlan = ubuntuNetwork1
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
