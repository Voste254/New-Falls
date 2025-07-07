
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export default function SettingsModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Settings</h2>
            <Dialog.Close asChild>
              <button>
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <p className="text-sm text-gray-500 mb-4">User preferences and controls</p>
          <div className="space-y-2">
            <button className="btn text-sm underline text-blue-500">Account Settings</button><br/>
            <button className="btn text-sm underline text-blue-500">Theme Options</button><br/>
            <button className="btn text-sm underline text-red-500">Save Changes</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
