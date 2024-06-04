/* eslint-disable no-prototype-builtins */
/**
 * @param {Object} target 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
 * @param {Object} template このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。
 * @returns {Object} 削除先オブジェクト
 */
export const restrict = (target, template) => {
  for (const key of Object.keys(target)) {
    /**
     * in 演算子は、プロトタイプチェーンのプロパティに対して true を返します。(継承されていないプロパティのみをチェックする場合は、代わりに Object.prototype.hasOwnProperty() を使用してください)。
     */
    if (!template.hasOwnProperty(key)) {
      delete target[key];
    }
  }
  return target;
};

/**
 * @param {Object} target 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
 * @param  {...Object} sources 削除したいプロパティを含むオブジェクトです。Symbol と継承プロパティは削除対象になりません。
 * @returns {Object} 削除先オブジェクト
 */
export const substract = (target, ...sources) => {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      // 継承されていないプロパティのみをチェックする場合は Object.prototype.hasOwnProperty()
      if (target.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }
  return target;
};
