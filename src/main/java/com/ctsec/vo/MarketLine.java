package com.ctsec.vo;

/**
 * 市值变化、市值率变化
 * 
 * <p>Title:MarketLine.java</p>
 * <p>Company: quant-chi</p>
 * <p>Description:</p>
 * @author:maxj
 * @date: 2017年12月22日
 *
 */
public class MarketLine {

	/**
	 * 日
	 */
	private String trade_day;

	/**
	 * 月
	 */
	private String trade_month;

	/**
	 * 年
	 */
	private String trade_year;
	
	/**
	 * 全国总市值
	 */
	private String total_sf;
	
	/**
	 * 公司总市值
	 */
	private String sf;
	
	/**
	 * 公司占有率
	 */
	private String sf_rate;

	/**
	 * 全国沪深股票总市值
	 */
	private String total_s;

	/**
	 * 全国沪市股票总市值
	 */
	private String total_s_sh;

	/**
	 * 全国深市股票总市值
	 */
	private String total_s_sz;

	/**
	 * 全国转股股票总市值
	 */
	private String total_s_stb;

	/**
	 * 公司沪深股票总市值
	 */
	private String s;

	/**
	 * 公司沪市股票总市值
	 */
	private String s_sh;

	/**
	 * 公司深市股票总市值
	 */
	private String s_sz;

	/**
	 * 公司转股股票总市值
	 */
	private String s_stb;

	/**
	 * 港股通股票总市值
	 */
	private String s_hk;

	/**
	 * 公司沪市股票总市值市占率
	 */
	private String s_sh_rate;

	/**
	 * 公司深市股票总市值市占率
	 */
	private String s_sz_rate;

	/**
	 * 全国沪深基金总市值
	 */
	private String total_f;

	/**
	 * 全国沪市基金总市值
	 */
	private String total_f_sh;

	/**
	 * 全国深市基金总市值
	 */
	private String total_f_sz;

	/**
	 * 公司沪深基金总市值
	 */
	private String f;

	/**
	 * 公司沪市基金总市值
	 */
	private String f_sh;

	/**
	 * 公司深市基金总市值
	 */
	private String f_sz;

	/**
	 * 公司沪市基金总市值市占率
	 */
	private String f_sh_rate;

	/**
	 * 公司深市基金总市值市占率
	 */
	private String f_sz_rate;

	/**
	 * 全国融资融券余额走势
	 */
	private String total_fin_slo;

	/**
	 * 公司融资融券余额走势
	 */
	private String fin_slo;

	/**
	 * 公司融资融券余额市占率走势
	 */
	private String fin_slo_rate;

	public String getByKey(String key) {
		switch (key) {
			case "total_sf":
				return this.getTotal_sf();
			case "sf":
				return this.getSf();
			case "sf_rate":
				return this.getSf_rate();
			case"total_s":
				return this.getTotal_s();
			case"total_s_sh":
				return this.getTotal_s_sh();
			case"total_s_sz":
				return this.getTotal_s_sz();
			case"total_s_stb":
				return this.getTotal_s_stb();
			case"s":
				return this.getS();
			case"s_sh":
				return this.getS_sh();
			case"s_sz":
				return this.getS_sz();
			case"s_stb":
				return this.getS_stb();
			case"s_hk":
				return this.getS_hk();
			case"s_sh_rate":
				return this.getS_sh_rate();
			case"s_sz_rate":
				return this.getS_sz_rate();
			case"total_f":
				return this.getTotal_f();
			case"total_f_sh":
				return this.getTotal_f_sh();
			case"total_f_sz":
				return this.getTotal_f_sz();
			case"f":
				return this.getF();
			case"f_sh":
				return this.getF_sh();
			case"f_sz":
				return this.getF_sz();
			case"f_sh_rate":
				return this.getF_sh_rate();
			case"f_sz_rate":
				return this.getF_sz_rate();
			case"total_fin_slo":
				return this.getTotal_fin_slo();
			case"fin_slo":
				return this.getFin_slo();
			case"fin_slo_rate":
				return this.getFin_slo_rate();
		}
		return "";
	}

	public String getTrade_day() {
		return trade_day;
	}

	public void setTrade_day(String trade_day) {
		this.trade_day = trade_day;
	}

	public String getTrade_month() {
		return trade_month;
	}

	public void setTrade_month(String trade_month) {
		this.trade_month = trade_month;
	}

	public String getTrade_year() {
		return trade_year;
	}

	public void setTrade_year(String trade_year) {
		this.trade_year = trade_year;
	}

	public String getTotal_sf() {
		return total_sf;
	}

	public void setTotal_sf(String total_sf) {
		this.total_sf = total_sf;
	}

	public String getSf() {
		return sf;
	}

	public void setSf(String sf) {
		this.sf = sf;
	}

	public String getSf_rate() {
		return sf_rate;
	}

	public void setSf_rate(String sf_rate) {
		this.sf_rate = sf_rate;
	}

	public String getTotal_s() {
		return total_s;
	}

	public void setTotal_s(String total_s) {
		this.total_s = total_s;
	}

	public String getTotal_s_sh() {
		return total_s_sh;
	}

	public void setTotal_s_sh(String total_s_sh) {
		this.total_s_sh = total_s_sh;
	}

	public String getTotal_s_sz() {
		return total_s_sz;
	}

	public void setTotal_s_sz(String total_s_sz) {
		this.total_s_sz = total_s_sz;
	}

	public String getTotal_s_stb() {
		return total_s_stb;
	}

	public void setTotal_s_stb(String total_s_stb) {
		this.total_s_stb = total_s_stb;
	}

	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	public String getS_sh() {
		return s_sh;
	}

	public void setS_sh(String s_sh) {
		this.s_sh = s_sh;
	}

	public String getS_sz() {
		return s_sz;
	}

	public void setS_sz(String s_sz) {
		this.s_sz = s_sz;
	}

	public String getS_stb() {
		return s_stb;
	}

	public void setS_stb(String s_stb) {
		this.s_stb = s_stb;
	}

	public String getS_hk() {
		return s_hk;
	}

	public void setS_hk(String s_hk) {
		this.s_hk = s_hk;
	}

	public String getS_sh_rate() {
		return s_sh_rate;
	}

	public void setS_sh_rate(String s_sh_rate) {
		this.s_sh_rate = s_sh_rate;
	}

	public String getS_sz_rate() {
		return s_sz_rate;
	}

	public void setS_sz_rate(String s_sz_rate) {
		this.s_sz_rate = s_sz_rate;
	}

	public String getTotal_f() {
		return total_f;
	}

	public void setTotal_f(String total_f) {
		this.total_f = total_f;
	}

	public String getTotal_f_sh() {
		return total_f_sh;
	}

	public void setTotal_f_sh(String total_f_sh) {
		this.total_f_sh = total_f_sh;
	}

	public String getTotal_f_sz() {
		return total_f_sz;
	}

	public void setTotal_f_sz(String total_f_sz) {
		this.total_f_sz = total_f_sz;
	}

	public String getF() {
		return f;
	}

	public void setF(String f) {
		this.f = f;
	}

	public String getF_sh() {
		return f_sh;
	}

	public void setF_sh(String f_sh) {
		this.f_sh = f_sh;
	}

	public String getF_sz() {
		return f_sz;
	}

	public void setF_sz(String f_sz) {
		this.f_sz = f_sz;
	}

	public String getF_sh_rate() {
		return f_sh_rate;
	}

	public void setF_sh_rate(String f_sh_rate) {
		this.f_sh_rate = f_sh_rate;
	}

	public String getF_sz_rate() {
		return f_sz_rate;
	}

	public void setF_sz_rate(String f_sz_rate) {
		this.f_sz_rate = f_sz_rate;
	}

	public String getTotal_fin_slo() {
		return total_fin_slo;
	}

	public void setTotal_fin_slo(String total_fin_slo) {
		this.total_fin_slo = total_fin_slo;
	}

	public String getFin_slo() {
		return fin_slo;
	}

	public void setFin_slo(String fin_slo) {
		this.fin_slo = fin_slo;
	}

	public String getFin_slo_rate() {
		return fin_slo_rate;
	}

	public void setFin_slo_rate(String fin_slo_rate) {
		this.fin_slo_rate = fin_slo_rate;
	}
}
