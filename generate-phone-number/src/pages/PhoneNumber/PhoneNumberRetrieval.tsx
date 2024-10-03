import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as apis from "../../apis";
import Countdown from "../../components/common/Countdown";

const PhoneNumberRetrieval = () => {
  const [googleSheetData, setGoogleSheetData] = useState<any[][] | null | undefined>();

  useEffect(() => {
    (async () => {
      const values = await apis.googleSheets.fetchData();
      console.log({ values })
      setGoogleSheetData(values)
    })()
  }, [])

  const updateMutation = useMutation({
    mutationFn: () => {
      return apis.googleSheets.updateData()
    }
  })

  return <>
    <Button onClick={() => updateMutation.mutate()}>
      Click
    </Button>

    <Countdown archiveTimer="00:05:00" onReset={() => { }} />
  </>
}

export default PhoneNumberRetrieval;
