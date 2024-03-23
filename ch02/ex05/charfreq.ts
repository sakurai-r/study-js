/**
 * このNodeプログラムは標準入力からテキストを読み込み、
 * テキスト中の文字の頻度を計算し、降順でヒストグラムを
 * 表示する。実行するには、Node 12以降が必要。
 *
 * PowerShell の場合はファイルをメモ帳などで BOM 付きの UTF-8 として保存し、以下のコマンドで実行すればよい。
 * [既存のエンコードの変更](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-7.4#changing-the-default-encoding)
 * ```sh
 * > $OutputEncoding = [System.Text.Encoding]::UTF8
 * # プログラムを実行 (TS)
 * > cat path/to/file.txt | npx ts-node ch01/ex08/index.ts
 * ```
 */

// このクラスでは、Mapを拡張して、キーがマップ上に存在しないときに、
// get()メソッドがnullの代わりに指定した値を返すようにする。
class DefaultMap extends Map {
    defaultValue: number
    constructor(defaultValue: number) {
        super() // 親クラスのコンストラクタを呼び出す。
        this.defaultValue = defaultValue // デフォルト値を記憶する。
    }
    get(key: string) {
        if (this.has(key)) {
            // マップ中にキーが存在すれば、
            return super.get(key) // 親クラス中の値を返す。
        } else {
            return this.defaultValue // 存在しなければ、デフォルト値を返す。
        }
    }
}
// このクラスは、文字頻度ヒストグラムを計算し、表示する。
class Histogram {
    letterCounts: DefaultMap
    totalLetters: number
    constructor() {
        this.letterCounts = new DefaultMap(0) // 文字と文字数をマップする。
        this.totalLetters = 0 // 全体の文字数。
    }
    // この関数は、text中の文字でヒストグラムを更新する。
    add(text: string) {
        // テキストから空白文字を取りのぞき、すべての文字を大文字に変換する。
        text = text.replace(/\s/g, "").toUpperCase()
        // テキスト中の文字をループする。
        for (const character of text) {
            const count = this.letterCounts.get(character) // 直前の値を取得する。
            this.letterCounts.set(character, count + 1) // 1増やす。
            this.totalLetters++
        }
    }
    // ヒストグラムを文字列に変換して、ASCIIグラフィックとして表示する。
    toString() {
        // マップを、[キー、文字数]配列に変換する。
        let entries = [...this.letterCounts]
        // 文字数順にソートする。文字数が同じ場合は、アルファベット順でソートする。
        entries.sort((a, b) => {
            // ソート順を定義する関数。
            if (a[1] === b[1]) {
                // 文字数が同じ場合は、
                return a[0] < b[0] ? -1 : 1 // アルファベット順でソートする。
            } else {
                // 文字数が異なる場合は、
                return b[1] - a[1] // 降順でソートする。
            }
        })
        // 文字数をパーセントに変換する。
        for (const entry of entries) {
            entry[1] = (entry[1] / this.totalLetters) * 100
        }
        // 1%未満の文字は表示しない。
        entries = entries.filter((entry) => entry[1] >= 1)
        // 各項目を一行のテキストに変換する。
        const lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );
        // 各行を改行文字で区切って結合し、結合した文字列を返す。
        return lines.join("\n")
    }
}
// このasync関数（Promiseを返す関数）は、Histogramオブジェクトを生成する。
// 標準入力からテキストを非同期に読み出し、読み出したテキストをヒストグラムに
// 追加する。テキストを最後まで読み出したら、ヒストグラムを返す。
async function histogramFromStdin() {
    // https://nodejs.org/api/process.html#processstdin
    process.stdin.setEncoding("utf-8") // バイト列ではなく、Unicode文字列を読む。
    const histogram = new Histogram()
    for await (const chunk of process.stdin) {
        histogram.add(chunk)
    }
    return histogram
}
// この最後の一行がこのプログラムのメイン部分。
// 標準入力からHistogramオブジェクトを生成し、ヒストグラムを表示する。
histogramFromStdin().then((histogram) => {
    console.log(histogram.toString())
})
