import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLSelectElement
import org.w3c.dom.get
import kotlin.browser.document
import kotlin.math.*

val subnet_list = listOf("128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0",
        "254.0.0.0", "255.0.0.0", "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0",
        "255.252.0.0", "255.254.0.0", "255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0",
        "255.255.248.0", "255.255.252.0", "255.255.254.0", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224",
        "255.255.255.240", "255.255.255.248", "255.255.255.252", "255.255.255.254", "255.255.255.255"
)
var ips: List<String>? = null
var subnet_masks: List<String>? = null
var total_host: Double = 0.0

var network_addr = mutableListOf<String>("0", "0", "0", "0")

fun main(args: Array<String>) {
    val submit = document.getElementById("submit-btn")
    if (submit != null) {
        submit.addEventListener(
                "click",
                { calculate() }
        )
    }
}

fun calculate() {
    var ip = document.getElementById("ipv4_ip") as HTMLInputElement
    var subnet_mask = document.getElementById("subnet_form") as HTMLSelectElement
//
    ips = ip.value.split(".")
    subnet_masks = subnet_list[subnet_mask.selectedIndex].split(".")

    document.getElementById("ip_address")!!.innerHTML = ip.value
    network_address()
    broadcast_addr()
    total_hosts(subnet_mask.value.toInt())
    usable_hosts()
    document.getElementById("subnet_mask")!!.innerHTML = subnet_list[subnet_mask.selectedIndex]
    wildcard_mask()
    ip_class()
    ip_type()
    document.getElementById("cidr")!!.innerHTML = "/" + subnet_mask.value
    document.getElementById("short")!!.innerHTML = ip.value + "/" + subnet_mask.value
}

fun network_address() {
    for (i in 0..3) {
        var x = ips!![i].toInt()
        var y = subnet_masks!![i].toInt()
        x = x and y
        network_addr[i] = x.toString()
    }
    document.getElementById("nw_address")!!.innerHTML = strings_to_string(network_addr)
}


fun broadcast_addr() {
    var broadcast_addr = mutableListOf<String>(network_addr[0], network_addr[1], network_addr[2], network_addr[3])
    for (i in 0..3) {
        if (broadcast_addr[i].toInt() == 0) {
            var x = 255 - subnet_masks!![i].toInt()
            broadcast_addr[i] = x.toString()
        }
    }
    document.getElementById("broadcast_addr")!!.innerHTML = strings_to_string(broadcast_addr)
    var ip_range = mutableListOf<String>(network_addr[0], network_addr[1], network_addr[2], network_addr[3])
    ip_range[3] = (ip_range[3].toInt()+1).toString()
    broadcast_addr[3] = (broadcast_addr[3].toInt()-1).toString()
    document.getElementById("uhir")!!.innerHTML = strings_to_string(ip_range) + " - " + strings_to_string(broadcast_addr)
}

fun total_hosts(cidr: Int) {
    total_host = 2.0.pow(32 - cidr)
    document.getElementById("total_hosts")!!.innerHTML = total_host.toString()
}

fun usable_hosts() {
    document.getElementById("usable_hosts")!!.innerHTML = (total_host-2).toString()
}

fun ip_class() {
    if (ips!![0].toInt() <= 127) {
        document.getElementById("ip_class")!!.innerHTML = "A"
    } else if (ips!![0].toInt() <= 191) {
        document.getElementById("ip_class")!!.innerHTML = "B"
    } else if (ips!![0].toInt() <= 223) {
        document.getElementById("ip_class")!!.innerHTML = "C"
    } else if (ips!![0].toInt() <= 239) {
        document.getElementById("ip_class")!!.innerHTML = "D"
    } else {
        document.getElementById("ip_class")!!.innerHTML = "E"
    }
}

fun ip_type() {
    if (ips!![0].toInt() == 10) {
        document.getElementById("ip_type")!!.innerHTML = "Private"
    } else if ((ips!![0].toInt() == 172) && (ips!![1].toInt() == 16)) {
        document.getElementById("ip_type")!!.innerHTML = "Private"
    } else if ((ips!![0].toInt() == 192) && (ips!![1].toInt() == 168)) {
        document.getElementById("ip_type")!!.innerHTML = "Private"
    } else {
        document.getElementById("ip_type")!!.innerHTML = "Public"
    }
}

fun wildcard_mask() {
    var wildcard_masks = mutableListOf<String>("0", "0", "0", "0")
    for (i in 0..3) {
        var x = 255 - subnet_masks!![i].toInt()
        wildcard_masks[i] = x.toString()
    }
    document.getElementById("wildcard_mask")!!.innerHTML = strings_to_string(wildcard_masks)
}

fun strings_to_string(strs: MutableList<String>): String {
    var str = strs[0] + '.' + strs[1] + '.' + strs[2] + '.' + strs[3]
    return str
}