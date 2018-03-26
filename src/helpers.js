export const composeQuery = (acc, [key, value]) => acc[key](value)

export const getProp = (obj, prop) =>
  prop.split('.')
    .reduce((acc, key) => acc[key], obj)

export const byOrder = (...rules) =>
  (A, B) => {
    for (const rule of rules) {
      const args = Array.isArray(rule) ? rule : Array(rule)
      const compare = byProps(A, B, ...args)
      if (Boolean(compare)) return compare
    }
    return 0
  }

export const byProps = (A, B, prop, desc) => {
  const a = getProp(A, prop)
  const b = getProp(B, prop)
  if (a < b) return desc ?  1 : -1
  if (a > b) return desc ? -1 :  1
  return 0
}
