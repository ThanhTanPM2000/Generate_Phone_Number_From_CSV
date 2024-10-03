import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type CountDownProps = {
  archiveTimer: string;
  isStart?: boolean;
  onStop?: () => void;
  onContinue?: () => void;
  onReset?: () => void;
  resetCount?: number;
}

const Countdown = ({ archiveTimer, isStart = true, onReset, resetCount }: CountDownProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isStart) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds + 1) % 60);
        if (seconds === 59) {
          setMinutes(prevMinutes => (prevMinutes + 1) % 60);
          if (minutes === 59) {
            setHours(prevHours => prevHours + 1);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer)
  })

  useEffect(() => {
    if (resetCount) {
      handleResetTimer();
    }
  }, [resetCount])

  const handleResetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    onReset && onReset();
  }

  const isTimerArchived = archiveTimer >= `${hours}:${minutes}:${hours}`

  const TextComponent = ({ children }: { children: any }) => {
    return <Text color={isTimerArchived ? "green" : "white"} >{children}</Text>
  }


  return <>
    <Flex gap={2} bg="primary" maxWidth="140px" alignItems="center" justifyContent="center" px={3} py={2} rounded={20} >
      <TextComponent>
        {hours}
      </TextComponent>
      <TextComponent>
        :
      </TextComponent>
      <TextComponent>
        {minutes}
      </TextComponent>
      <TextComponent>
        :
      </TextComponent>
      <TextComponent>
        {seconds}
      </TextComponent>
    </Flex>
  </>
}

export default Countdown;
