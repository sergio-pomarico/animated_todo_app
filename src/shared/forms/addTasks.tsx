import React, {FC} from 'react';
import {Text, Box} from '../atoms';
import {Button, DatePicker, Input} from '../components';

const CreateTask: FC = ({}) => {
  return (
    <Box marginHorizontal="m">
      <Text
        fontWeight="bold"
        lineHeight={28}
        fontSize={24}
        marginVertical="m"
        textTransform="uppercase"
        textAlign="center">
        Add Task
      </Text>
      <Input
        onChanceText={() => {}}
        placeholder="Add the task subject"
        label="Subject"
        error={undefined}
        touched={false}
      />
      <DatePicker label="Hora" type="time" />
      <DatePicker label="Fecha" type="date" />
      <Button label="Submit" onPress={() => {}} />
    </Box>
  );
};

export default CreateTask;
