interface Difference {
  added: Array<any>,
  removed: Array<any>,
  different: boolean
}

export = function difference(a1: Array<any>, a2: Array<any>): Difference {
  const a2Set = new Set(a2)
  const removed = a1.filter(x => !a2Set.has(x)) // что есть в a1, чего нет в a2

  const a1Set = new Set(a1)
  const added = a2.filter(x => !a1Set.has(x)) // что есть в a2, чего нет в a1

  const isDifferent = Boolean(added.length || removed.length)

  return { added: added, removed: removed, different: isDifferent }
}