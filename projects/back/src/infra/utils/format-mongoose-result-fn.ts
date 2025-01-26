export function formatResult(result) {
    return result.map(doc => {
      const { _id, __v, ...rest } = doc;
      return { id: _id, ...rest };
    });
  }
  