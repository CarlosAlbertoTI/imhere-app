import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'

import { Participant } from '../../components/Participant'

import { styles } from './styles'

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState("")


    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert('Erro!', 'Usuário ja esta na lista!')
        }
        setParticipants(previousState => [...previousState, participantName])
        setParticipantName('')
        return Alert.alert('Sucesso!', 'Usuário adicionado com sucesso!')
    }

    function handleParticipantDelete(name: string) {
        Alert.alert(
            'Remover',
            `Você tem certeza que deseja remover ${name}?`, [
            {
                text: 'Sim',
                style: 'default',
                onPress: () => {
                    setParticipants(previousState => previousState.filter(participantToBeDeleted => participantToBeDeleted !== name))
                    return Alert.alert('Deletado!')
                }

            }, {
                text: 'Não',
                style: 'cancel'
            }
        ]
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de janeiro de 2023</Text>


            <View style={styles.form}>

                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor={'#6b6b6b'}
                    value={participantName}
                    onChangeText={setParticipantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantDelete(item)}
                    />

                )}
                ListEmptyComponent={({ item }) => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no seu evento? Adicione novas pessoas a cima!
                    </Text>
                )}
            />
            {/* <ScrollView showsVerticalScrollIndicator={false}>

                {participants.map(participants => {
                    return <Participant
                        key={participants}
                        name={participants}
                        onRemove={() => handleParticipantDelete(participants)}
                    />

                })}
            </ScrollView> */}
        </View>
    )
}