import inputView from "../view/inputView.js";
import Lotto from "../domain/Lotto.js";
import outputView from "../view/outputView.js";
import RankedLotto from "../domain/RankedLotto.js";

class ControllerLotto {
    #money

    async playLotto() {
        this.#money = await this.inputLottoMoney()
        const lotto = new Lotto();
        this.showLottoCount(lotto.countLotto(this.#money));
        lotto.makeLotto(this.#money)
        this.showPurchasedLotto(lotto.lottoNumber);
        this.playStatisticalChart(lotto.lottoNumber)
    }

    async playStatisticalChart(lotto){
        const rankedLotto = new RankedLotto();
        rankedLotto.setNumber(lotto)
        const ranks = rankedLotto.ranking((await this.inputWinningNumbers()).split(','), await this.inputBonusNumber())
        const result=rankedLotto.getResult(ranks)
        this.showWinningHistory(result)
        rankedLotto.earningsRate(this.#money,result)
        this.showEarningsRate(rankedLotto.getProfit)
        this.restart()
    }


    inputLottoMoney(){
        return inputView.readMoney()
    }

    showLottoCount(count) {
        outputView.printCountLotto(count);
    }

    showPurchasedLotto(lottos){
        outputView.printLottoNumber(lottos)
    }
    inputWinningNumbers() {
        return inputView.readWinningNumber();
    }
    inputBonusNumber() {
        return inputView.readBonusNumber();
    }

    showWinningHistory(rank){
        outputView.printWinningHistory(rank);
    }

    showEarningsRate(rate){
        outputView.printEarningsRate(rate)
    }

    async restart(){
        if(await inputView.readRestartOrFinish()) this.playLotto()
    }
}

const controllerLotto = new ControllerLotto()

controllerLotto.playLotto()

export default ControllerLotto