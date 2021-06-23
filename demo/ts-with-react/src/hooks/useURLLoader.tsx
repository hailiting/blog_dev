import { useState, useEffect } from "react";
import axios from "axios";
// useURLLoader
const useURLLoader = (url: string, deps: any = null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(url).then(result => {
      setData(result.data);
      setLoading(false);
    })
  }, [deps, url])
  return [data, loading]
}
export default useURLLoader;