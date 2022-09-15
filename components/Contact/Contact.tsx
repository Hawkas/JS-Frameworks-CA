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
const phoneRegex =
  /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;
//* Given how phone numbers vary in length and other things, I feel like using a regex rather than a library is far from optimal. But assignment wants a 'specific' regex pattern so here's a regex that requires a valid country code.

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter your name' }),
  phone: z.string().trim().regex(phoneRegex, {
    message: 'Invalid phone number. Please include country code.',
  }),
  query: z.string().trim().min(1, { message: 'You must select message type' }),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Can not be empty' })
    .max(1000, { message: 'Please limit your message to 1000 characters' }),
});

export function Contact() {
  const modals = useModals();
  const form = useForm({
    validate: zodResolver(contactSchema),
    initialValues: { name: '', phone: '', query: '', message: '' },
  });

  const [success, setSuccess] = useState('waiting');
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
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
