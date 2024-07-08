import React, { useState, useLayoutEffect } from 'react'
import OctaSelect from 'components/octaComponents/OctaSelect/OctaSelect'
import { useTypebot } from 'contexts/TypebotContext'
import { WOZAssignOptions } from 'models'
import { OptionType } from 'components/octaComponents/OctaSelect/OctaSelect.type'

type Props = {
  onSelect: (option: WOZAssignOptions) => void
  selectedProfile?: string
}

export const WozAssignSelect = ({ onSelect, selectedProfile }: Props) => {
  const { wozProfiles } = useTypebot();
  const [defaultSelected, setDefaultSelected] = useState<OptionType>()

  const handleOnChange = (selected: any): void => {
    onSelect(selected)
  }

  useLayoutEffect(() => {
    if (wozProfiles) {
      const defaultSelectedBot = wozProfiles.filter(
        (item) => (selectedProfile && item.id === selectedProfile) || item.isWoz
      )[0];

      if (defaultSelectedBot) {
        setDefaultSelected({
          label: defaultSelectedBot.name,
          value: {
            botToCall: defaultSelectedBot.id
          },
          key: ''
        })
      }
    }
    return () => {
      setDefaultSelected(undefined)
    };
  }, [wozProfiles, selectedProfile])

  return (
    <OctaSelect
      placeholder="Selecione um perfil para atender"
      defaultSelected={defaultSelected}
      findable
      options={wozProfiles}
      onChange={handleOnChange}
    />
  )
}
