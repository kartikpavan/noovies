import React from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

const MyModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: any }) => {
   const toggleModal = () => {
      setModalVisible(!modalVisible);
   };

   return (
      <View style={{ flex: 1 }}>
         {/* <Button title="Show modal" onPress={toggleModal} /> */}

         <Modal isVisible={modalVisible}>
            <View style={{ flex: 1 }}>
               <Text>Hello!</Text>
               <Button title="Hide modal" onPress={toggleModal} />
            </View>
         </Modal>
      </View>
   );
};

export default MyModal;
