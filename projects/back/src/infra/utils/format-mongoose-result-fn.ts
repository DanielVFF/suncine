export function formatResult(result) {
  if (Array.isArray(result)) {
    return result.map(doc => {
      const { _id, __v, ...rest } = doc;
      return { id: _id, ...rest };
    });
  } else if (result && typeof result === 'object') {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  }
  return result; 
}
