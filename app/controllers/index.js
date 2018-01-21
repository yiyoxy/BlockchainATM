var Customer = require('../models/customer');

//首页，开始交易
exports.welcome = function (req, res) {
    delete req.session.customer;//清除customer的session数据
    res.render('welcome', {
        bigTitle: "Welcome to use the Blockchain ATM!"
    });
}
//输入卡号页
exports.enterAcc = function (req, res) {
    res.render('enterAcc', {
        bigTitle: "Please enter your card number:"
    });
}
//验证客人输入的卡号，验证成功则跳转输入密码页
exports.submitAcc = function (req, res) {
    var _customer = req.body.customer;
    req.session.customer = new Customer();
    // var customer = req.session.customer;
    // console.log(typeof customer);
    // Object.defineProperty(customer, "debitAccount", _customer.debitAccount)//将debitAccount存储在session中
    req.session.customer["debitAccount"] = _customer.debitAccount;//将debitAccount存储在session中
    console.log(req.session.customer["debitAccount"]);
    var data = {
        "success": true,
        "msg": "/enterPwd"
    };
    res.send(data);//先直接跳转，等待后边集成blockchain后做密码判断
}
//输入密码页
exports.enterPwd = function (req, res) {
    var _customer = req.session.customer;
    console.log(_customer["debitAccount"]);
    if (typeof _customer == "undefined" || !_customer.hasOwnProperty("debitAccount") || _customer.debitAccount == "") {
        return res.redirect("/");//若未输入过卡号，则因跳转到首页
    }
    console.log(req.session.customer.debitAccount);
    res.render('enterPwd', {
        bigTitle: "Please enter your password:"
    });
}
//验证客人输入的密码，验证成功则跳转到选择atm页
exports.submitPwd = function (req, res) {
    var _customer = req.body.customer;
    var customer = req.session.customer;
    console.log(typeof customer);
    // Object.defineProperty(customer, "password", _customer.password)//将debitAccount存储在session中
    // req.session.customer["password"] = _customer.password;//将debitAccount存储在session中
    var data = {
        "success": true,
        "msg": "/chooseAtm"
    };
    res.send(data);//先直接跳转，等待后边集成blockchain后做密码判断
}
//选择ATM页
exports.chooseAtm = function (req, res) {
    var _customer = req.session.customer;
    if (typeof _customer == "undefined" || !_customer.hasOwnProperty("debitAccount") || _customer.debitAccount == "") {
        return res.redirect("/");//若未输入过卡号，则因跳转到首页
    } else if (!_customer.hasOwnProperty("password")) {
        return res.redirect("/enterPwd");//若未输入过密码，则因跳转到输入密码页
    }
    res.render('chooseAtm', {
        bigTitle: "Please select the ATM to serve you:"
    });
}