<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="address in addressInfo" :key="address.id">
        <span class="username" :class="{selected:address.isDefault==1}">{{address.consignee}}</span>
        <p @click="changeDefault(address,addressInfo)">
          <span class="s1">{{address.fullAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-show="address.isDefault==1">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="order in orderInfo.detailArrayList" :key="order.skuId">
          <li>
            <img :src="order.imgUrl" alt style="width:100px;height:100px;" />
          </li>
          <li>
            <p>{{order.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{order.orderPrice}}.00</h3>
          </li>
          <li>X{{order.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="message"></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b>
            <i>{{orderInfo.totalNum}}</i>件商品，总商品金额
          </b>
          <span>¥{{orderInfo.totalAmount}}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:
        <span>¥{{orderInfo.totalAmount}}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{userAddressDefault.fullAddress}}</span>
        收货人：
        <span>{{userAddressDefault.consignee}}</span>
        <span>{{userAddressDefault.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Trade",
  data() {
    return {
      message: "",
      orderId: ""
    };
  },
  mounted() {
    this.$store.dispatch("getUserAddress");
    this.$store.dispatch("getOrderInfo");
  },
  computed: {
    ...mapState({
      addressInfo: state => state.trade.address,
      orderInfo: state => state.trade.orderInfo
    }),
    //提交订单时最终的地址
    userAddressDefault() {
      return this.addressInfo.find(item => item.isDefault == 1);
    }
  },
  methods: {
    //修改默认地址
    changeDefault(address, addressInfo) {
      addressInfo.forEach(item => {
        item.isDefault = 0;
      });
      address.isDefault = 1;
    },
    //提交订单
    async submitOrder() {
      //交易编码
      let { tradeNo } = this.orderInfo;
      let data = {
        consignee: this.userAddressDefault.consignee, //最终收件人的名字
        consigneeTel: this.userAddressDefault.phoneNum, //手机号
        deliveryAddress: this.userAddressDefault.fullAddress, //地址
        paymentWay: "ONLINE", //支付方式
        orderComment: this.message, //留言信息
        orderDetailList: this.orderInfo.detailArrayList //商品清单
      };
      let results = await this.$API.reqSubmitOrder(tradeNo, data);
      if (results.code == 200) {
        this.orderId = results.data;
      //路由跳转 + 路由传参
      this.$router.push('/pay?orderId=' + this.orderId);
      } else {
        //提交订单失败
        return results.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(./css/index.css);
</style>