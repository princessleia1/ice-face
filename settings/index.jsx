function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">ICE-FACE SETTINGS
        </Text>
        }>
      <TextInput
        title="My Profile Details"
        label="Enter Full Name"
        settingsKey="textNameInput"
      />
      <TextInput
        title="My Profile Details"
        label="Enter Address"
        settingsKey="textAddressInput"
      />    
      <TextInput
        title="My Profile Details"
        label="Enter Phone Number"
        settingsKey="textPhoneInput"
      />    
      <Section
        title={<Text align="center">ICE CONTACTS
        </Text>
        }>
        </Section>
      <Section>
      <TextInput
        title="My ICE Contact Details"
        label="Enter ICE Contact Name 1"
        settingsKey="textContactNameInput"
       />
      <TextInput
        title="My ICE Contact Details"
        label="Enter ICE Phone Number 1"
        settingsKey="textContactPhoneInput"        
       />
      <TextInput
        title="My ICE Contact Details"
        label="Enter ICE Contact Name 2"
        settingsKey="textContactName1Input"
       />
      <TextInput
        title="My ICE Contact Details"
        label="Enter ICE Contact Phone Number 2"
        settingsKey="textContactPhone2Input"        
       />
      </Section>
        <Button
        label="Button"
        onClick={() => console.log("Clicked!")}
      />
      <Button
        list
        label="Clear Settings Storage"
        onClick={() => props.settingsStorage.clear()}
      />      
      </Section>
      <Section
        title={<Text bold align="center">Build Version</Text>}>
        <Text>
          v0.0.1-Alpha.
        </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
