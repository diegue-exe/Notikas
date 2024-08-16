import React, { useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../type'
import { Texto } from '../../../../common/Texto/Texto'
import { getNoteById } from '../../application/note/get/getNote'
import { useNotesRepository } from '../../providers/NotesRepository/useNotesRepository'
import { Note } from '../../../../../db/schema'
import { isUndefined } from '../../../../common/utilities/isUndefined'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Layout } from '../../../../common/Layout/Layout'
import { Header } from '../../_components/Header/Header'
import theme from '../../../../theme'
import { updateNote } from '../../application/note/update/updateNote'
import { useNotes } from '../../providers/Notes/useNotes'

interface Props {
  route: RouteProp<RootStackParamList, 'EditNote'>
}

export const EditNote: React.FC<Props> = ({ route }) => {
  const { noteId } = route.params
  const { notesRepository } = useNotesRepository()
  const { loadNotes } = useNotes()

  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined)
  const [content, setContent] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    const onLoad = async () => {
      const [currentNote] = await getNoteById(notesRepository, noteId)
      setCurrentNote(currentNote)
      setTitle(currentNote.title)
      setContent(currentNote?.content)
    }
    onLoad()
  }, [])

  if (isUndefined(currentNote) || isUndefined(title))
    return <Texto>Loading...</Texto>

  const handleSave = async () => {
    if (!isUndefined(content) && !isUndefined(title))
      updateNote(notesRepository, {
        ...currentNote,
        title,
        content,
      })
    loadNotes()
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Layout>
          <Header />
          <ScrollView>
            <TextInput
              style={styles.titleInput}
              placeholder="Ponle un título a la nota"
              onChangeText={setTitle}
              value={title}
            />
            <TextInput
              style={styles.contentInput}
              multiline
              placeholder="Escribe aquí lo que quieras :)"
              onChangeText={setContent}
              value={content}
            />
          </ScrollView>
        </Layout>
        <Pressable
          style={styles.bottomButton}
          android_ripple={{ color: theme.colors.white }}
          onPress={handleSave}
        >
          <FontAwesome name="save" size={16} color="white" />
          <Texto color="white">Guardar</Texto>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleInput: {
    fontFamily: theme.fonts.montserratBold,
    fontSize: 24,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
  },
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
})
