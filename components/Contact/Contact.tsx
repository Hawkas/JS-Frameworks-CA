import { PrimaryButton } from '@Buttons/PrimaryButton';
import { ActionIcon, Alert, Group, Paper, Select, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons';
import { useTextStyles } from 'lib/styles/typography';
import { useState } from 'react';
import { z } from 'zod';
import { useStyles } from './Contact.styles';

//? Regex taken from https://stackoverflow.com/a/16699507
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  phone: z.string().regex(phoneRegex, {
    message: 'Invalid phone number',
  }),
  query: z.string().trim().min(1, { message: 'You must select message type' }),
  message: z
    .string()
    .min(1, { message: 'Can not be empty' })
    .max(1000, { message: 'Please limit your message to 1000 characters' }),
});

export function Contact() {
  const modals = useModals();
  const form = useForm({
    validate: zodResolver(contactSchema),
    initialValues: { name: '', phone: '', query: '', message: '' },
  });

  // Since the messages use the NextJS api, they should only fail to submit if, well,
  // the whole site is down. I'll save the effort and just let it be empty if it doesnt connect.
  //* Validation errors are of course displayed.
  const [success, setSuccess] = useState('waiting');
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text
            component="h2"
            className={cx(classes.title, textClass.primaryH3)}
            sx={{ color: '#fff' }}
          >
            Contact details
          </Text>
        </div>

        <form
          className={classes.form}
          onSubmit={form.onSubmit(() => {
            setSuccess('success');
          })}
        >
          <ActionIcon
            aria-label="Close"
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => modals.closeModal('contact')}
          >
            <IconX size={18} />
          </ActionIcon>
          <Text mb={52} component="h2" className={cx(classes.title, textClass.primaryH3)}>
            Send us a message
          </Text>

          <div>
            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Name"
              placeholder="Enter your name"
              {...form.getInputProps('name', { type: 'input' })}
            />

            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Phone Number"
              placeholder="Enter your phone number"
              {...form.getInputProps('phone')}
            />

            <Select
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Query type"
              placeholder="Select a query type"
              data={['Enquiry', 'Complaint', 'Compliment', 'General Message']}
              rightSection={<IconChevronDown size={14} />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              rightSectionWidth={40}
              {...form.getInputProps('query')}
            />

            <Textarea
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Message"
              placeholder="Enter your message"
              minRows={5}
              {...form.getInputProps('message')}
            />

            <Group position={success === 'success' ? 'apart' : 'right'}>
              {success === 'success' ? (
                <Alert
                  withCloseButton
                  closeButtonLabel="Close alert"
                  title="Message sent"
                  icon={<IconCheck size={18} />}
                  color="green"
                  onClose={() => {
                    setSuccess('waiting');
                  }}
                  mt={40}
                >
                  We&apos;ll get back to you as soon as we&apos;re able
                </Alert>
              ) : (
                <></>
              )}
              <PrimaryButton type="submit" primary className={classes.control}>
                Send message
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
