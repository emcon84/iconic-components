
import { Button, Input, Select, DatePicker } from './components'
// import { DatePicker } from './components/date-picker/DatePicker';
import IconDownload from './components/icons/IconDownload';
import './index.css'

import { useState } from 'react'


function App() {

  const [loading, setLoading] = useState(false)
  const [, setSelectedValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };



  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const options = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' },
  ];


  return (
    <div style={{ background: '#fff', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        type='primary'
        label='Enviar datos'
        loading={loading}
        minWidth='100px'
        onPress={() => handleLoading()}
      />
      <Button
        type='primary'
        label='Subir archivo asdasdasd'
        loading={loading}
        minWidth='100px'
        icon={<IconDownload style={{ marginRight: 5 }} />}
        onPress={() => handleLoading()}
      />
      <Select
        options={options}
        onChange={handleSelectChange}
      />
      <Input
        placeholder='Ingrese texto'
        type='text'
        mode='primary'
        value={inputValue}
        onChange={setInputValue}
      />

      <DatePicker
        selectedDate={selectedDate}
        onChange={handleDateChange}
        setSelectedDate={setSelectedDate}
        mode={'primary'}
      />

    </div>
  )
}

export default App
