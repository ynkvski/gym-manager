import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';

export default function ClientDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <span className='inline-flex cursor-pointer items-center gap-2'>
            <Plus />
            Добавить
          </span>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить клиента</DialogTitle>
          </DialogHeader>
          Форма
        </DialogContent>
      </Dialog>
    </>
  );
}
