if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'ktjs'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'ktjs'.");
}
var ktjs = function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var subnet_list;
  var ips;
  var subnet_masks;
  var total_host;
  var network_addr;
  function main$lambda(it) {
    calculate();
    return Unit;
  }
  function main(args) {
    var submit = document.getElementById('submit-btn');
    if (submit != null) {
      submit.addEventListener('click', main$lambda);
    }
  }
  function calculate() {
    var tmp$, tmp$_0;
    var ip = Kotlin.isType(tmp$ = document.getElementById('ipv4_ip'), HTMLInputElement) ? tmp$ : throwCCE();
    var subnet_mask = Kotlin.isType(tmp$_0 = document.getElementById('subnet_form'), HTMLSelectElement) ? tmp$_0 : throwCCE();
    ips = split(ip.value, ['.']);
    subnet_masks = split(subnet_list.get_za3lpa$(subnet_mask.selectedIndex), ['.']);
    ensureNotNull(document.getElementById('ip_address')).innerHTML = ip.value;
    network_address();
    broadcast_addr();
    total_hosts(toInt(subnet_mask.value));
    usable_hosts();
    ensureNotNull(document.getElementById('subnet_mask')).innerHTML = subnet_list.get_za3lpa$(subnet_mask.selectedIndex);
    wildcard_mask();
    ip_class();
    ip_type();
    ensureNotNull(document.getElementById('cidr')).innerHTML = '/' + subnet_mask.value;
    ensureNotNull(document.getElementById('short')).innerHTML = ip.value + '/' + subnet_mask.value;
  }
  function network_address() {
    for (var i = 0; i <= 3; i++) {
      var x = toInt(ensureNotNull(ips).get_za3lpa$(i));
      var y = toInt(ensureNotNull(subnet_masks).get_za3lpa$(i));
      x = x & y;
      network_addr.set_wxm5ur$(i, x.toString());
    }
    ensureNotNull(document.getElementById('nw_address')).innerHTML = strings_to_string(network_addr);
  }
  function broadcast_addr() {
    var broadcast_addr = mutableListOf([network_addr.get_za3lpa$(0), network_addr.get_za3lpa$(1), network_addr.get_za3lpa$(2), network_addr.get_za3lpa$(3)]);
    for (var i = 0; i <= 3; i++) {
      if (toInt(broadcast_addr.get_za3lpa$(i)) === 0) {
        var x = 255 - toInt(ensureNotNull(subnet_masks).get_za3lpa$(i)) | 0;
        broadcast_addr.set_wxm5ur$(i, x.toString());
      }
    }
    ensureNotNull(document.getElementById('broadcast_addr')).innerHTML = strings_to_string(broadcast_addr);
    var ip_range = mutableListOf([network_addr.get_za3lpa$(0), network_addr.get_za3lpa$(1), network_addr.get_za3lpa$(2), network_addr.get_za3lpa$(3)]);
    ip_range.set_wxm5ur$(3, (toInt(ip_range.get_za3lpa$(3)) + 1 | 0).toString());
    broadcast_addr.set_wxm5ur$(3, (toInt(broadcast_addr.get_za3lpa$(3)) - 1 | 0).toString());
    ensureNotNull(document.getElementById('uhir')).innerHTML = strings_to_string(ip_range) + ' - ' + strings_to_string(broadcast_addr);
  }
  var Math_0 = Math;
  function total_hosts(cidr) {
    var n = 32 - cidr | 0;
    total_host = Math_0.pow(2.0, n);
    ensureNotNull(document.getElementById('total_hosts')).innerHTML = total_host.toString();
  }
  function usable_hosts() {
    ensureNotNull(document.getElementById('usable_hosts')).innerHTML = (total_host - 2).toString();
  }
  function ip_class() {
    if (toInt(ensureNotNull(ips).get_za3lpa$(0)) <= 127) {
      ensureNotNull(document.getElementById('ip_class')).innerHTML = 'A';
    }
     else if (toInt(ensureNotNull(ips).get_za3lpa$(0)) <= 191) {
      ensureNotNull(document.getElementById('ip_class')).innerHTML = 'B';
    }
     else if (toInt(ensureNotNull(ips).get_za3lpa$(0)) <= 223) {
      ensureNotNull(document.getElementById('ip_class')).innerHTML = 'C';
    }
     else if (toInt(ensureNotNull(ips).get_za3lpa$(0)) <= 239) {
      ensureNotNull(document.getElementById('ip_class')).innerHTML = 'D';
    }
     else {
      ensureNotNull(document.getElementById('ip_class')).innerHTML = 'E';
    }
  }
  function ip_type() {
    if (toInt(ensureNotNull(ips).get_za3lpa$(0)) === 10) {
      ensureNotNull(document.getElementById('ip_type')).innerHTML = 'Private';
    }
     else if (toInt(ensureNotNull(ips).get_za3lpa$(0)) === 172 && toInt(ensureNotNull(ips).get_za3lpa$(1)) === 16) {
      ensureNotNull(document.getElementById('ip_type')).innerHTML = 'Private';
    }
     else if (toInt(ensureNotNull(ips).get_za3lpa$(0)) === 192 && toInt(ensureNotNull(ips).get_za3lpa$(1)) === 168) {
      ensureNotNull(document.getElementById('ip_type')).innerHTML = 'Private';
    }
     else {
      ensureNotNull(document.getElementById('ip_type')).innerHTML = 'Public';
    }
  }
  function wildcard_mask() {
    var wildcard_masks = mutableListOf(['0', '0', '0', '0']);
    for (var i = 0; i <= 3; i++) {
      var x = 255 - toInt(ensureNotNull(subnet_masks).get_za3lpa$(i)) | 0;
      wildcard_masks.set_wxm5ur$(i, x.toString());
    }
    ensureNotNull(document.getElementById('wildcard_mask')).innerHTML = strings_to_string(wildcard_masks);
  }
  function strings_to_string(strs) {
    var str = strs.get_za3lpa$(0) + String.fromCharCode(toBoxedChar(46)) + strs.get_za3lpa$(1) + String.fromCharCode(toBoxedChar(46)) + strs.get_za3lpa$(2) + String.fromCharCode(toBoxedChar(46)) + strs.get_za3lpa$(3);
    return str;
  }
  Object.defineProperty(_, 'subnet_list', {
    get: function () {
      return subnet_list;
    }
  });
  Object.defineProperty(_, 'ips', {
    get: function () {
      return ips;
    },
    set: function (value) {
      ips = value;
    }
  });
  Object.defineProperty(_, 'subnet_masks', {
    get: function () {
      return subnet_masks;
    },
    set: function (value) {
      subnet_masks = value;
    }
  });
  Object.defineProperty(_, 'total_host', {
    get: function () {
      return total_host;
    },
    set: function (value) {
      total_host = value;
    }
  });
  Object.defineProperty(_, 'network_addr', {
    get: function () {
      return network_addr;
    },
    set: function (value) {
      network_addr = value;
    }
  });
  _.main_kand9s$ = main;
  _.calculate = calculate;
  _.network_address = network_address;
  _.broadcast_addr = broadcast_addr;
  _.total_hosts_za3lpa$ = total_hosts;
  _.usable_hosts = usable_hosts;
  _.ip_class = ip_class;
  _.ip_type = ip_type;
  _.wildcard_mask = wildcard_mask;
  _.strings_to_string_a0weo2$ = strings_to_string;
  subnet_list = listOf(['128.0.0.0', '192.0.0.0', '224.0.0.0', '240.0.0.0', '248.0.0.0', '252.0.0.0', '254.0.0.0', '255.0.0.0', '255.128.0.0', '255.192.0.0', '255.224.0.0', '255.240.0.0', '255.248.0.0', '255.252.0.0', '255.254.0.0', '255.255.0.0', '255.255.128.0', '255.255.192.0', '255.255.224.0', '255.255.240.0', '255.255.248.0', '255.255.252.0', '255.255.254.0', '255.255.255.0', '255.255.255.128', '255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248', '255.255.255.252', '255.255.255.254', '255.255.255.255']);
  ips = null;
  subnet_masks = null;
  total_host = 0.0;
  network_addr = mutableListOf(['0', '0', '0', '0']);
  main([]);
  Kotlin.defineModule('ktjs', _);
  return _;
}(typeof ktjs === 'undefined' ? {} : ktjs, kotlin);
