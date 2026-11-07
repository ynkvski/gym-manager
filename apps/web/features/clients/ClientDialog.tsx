'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { format } from 'date-fns';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ClientFormValues, clientSchema } from './client.schema';

export default function ClientDialog() {
  const [open, setOpen] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      birthDate: '',
      membershipPlanId: '',
      notes: '',
    },
  });

  const items = [
    { label: 'Месяц', value: 'month' },
    { label: '2 месяца', value: '2month' },
    { label: '3 месяца', value: '3month' },
    { label: 'Полгода', value: 'halfYear' },
    { label: 'Год', value: 'year' },
  ];

  const onSubmit = (values: ClientFormValues) => {
    console.log(values);
  };

  function handleCloseDialog() {
    setConfirmClose(false);
    setOpen(false);
    form.reset();
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setConfirmClose(true);
            return;
          }

          setOpen(true);
        }}
      >
        <AlertDialog open={confirmClose} onOpenChange={setConfirmClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Закрыть форму?</AlertDialogTitle>

              <AlertDialogDescription>
                Все введённые данные будут потеряны. Вы действительно хотите
                закрыть окно?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Продолжить заполнение</AlertDialogCancel>

              <AlertDialogAction onClick={handleCloseDialog}>
                Да, закрыть
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogTrigger>
          <span className='inline-flex cursor-pointer items-center gap-2'>
            <Plus />
            Добавить
          </span>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Добавить клиента</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <div className='pb-4 border-b-1 border-white/10'>
              <h3 className='text-xl'>Новый клиент</h3>
              <span>Добавление клиента в базу</span>
            </div>
            <div className='flex gap-2 items-center justify-between'>
              <div>
                <Label className='mb-1.5 ml-1' htmlFor='firstName'>
                  Имя
                </Label>
                <Input
                  id='firstName'
                  type='text'
                  placeholder='Иван'
                  {...form.register('firstName')}
                />
                {form.formState.errors.firstName && (
                  <p className='text-sm text-destructive'>
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className='mb-1.5 ml-1' htmlFor='lastName'>
                  Фамилия
                </Label>
                <Input
                  id='lastName'
                  type='text'
                  placeholder='Иванов'
                  {...form.register('lastName')}
                />
                {form.formState.errors.lastName && (
                  <p className='text-sm text-destructive'>
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex gap-2 items-center justify-between'>
              <div>
                <div>
                  <Label className='mb-1.5 ml-1' htmlFor='email'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='yourmail@example.com'
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <p className='text-sm text-destructive'>
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <Label className='mb-1.5 ml-1' htmlFor='phone'>
                    Телефон
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='+321 000 0000'
                    {...form.register('phone')}
                  />
                  {form.formState.errors.phone && (
                    <p className='text-sm text-destructive'>
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between gap-2'>
              <div>
                <Label className='mb-1.5 ml-1' htmlFor='bithday'>
                  Дата рождения
                </Label>
                <Controller
                  name='birthDate'
                  control={form.control}
                  render={({ field }) => {
                    const date = field.value
                      ? new Date(field.value)
                      : undefined;

                    return (
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type='button'
                              variant='outline'
                              data-empty={!date}
                              className='w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground'
                            >
                              {date ? (
                                format(date, 'PPP')
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <ChevronDownIcon data-icon='inline-end' />
                            </Button>
                          }
                        />
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={date}
                            onSelect={selectedDate => {
                              field.onChange(
                                selectedDate
                                  ? format(selectedDate, 'yyyy-MM-dd')
                                  : '',
                              );
                            }}
                            defaultMonth={date}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
              </div>
              <div>
                <span className='mb-1.5 ml-2'>Абонемент</span>
                <div>
                  <Controller
                    name='membershipPlanId'
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        items={items}
                        value={field.value || null}
                        onValueChange={value => field.onChange(value ?? '')}
                      >
                        <SelectTrigger className='w-full max-w-48 min-w-48'>
                          <SelectValue placeholder='Без абонемента' />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Тарифный план</SelectLabel>

                            {items.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className='mb-1 ml-2' htmlFor='notes'>
                Примечание
              </Label>
              <Textarea
                id='notes'
                placeholder='Введите текст...'
                {...form.register('notes')}
              />
              {form.formState.errors.notes && (
                <p className='text-sm text-destructive'>
                  {form.formState.errors.notes.message}
                </p>
              )}
            </div>
            <div className='flex gap-1 ml-auto'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setConfirmClose(true)}
              >
                Отмена
              </Button>

              <Button type='submit'>Добавить</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
