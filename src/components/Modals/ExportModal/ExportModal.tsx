import {
    Button,
    FormItem,
    FormLayout,
    Input,
    ModalPage,
    ModalPageProps,
} from '@vkontakte/vkui';
import { useState } from 'react';

export const ExportModal = (props: ModalPageProps) => {
    const [templateName, setTemplateName] = useState<string>('');

    return (
        <ModalPage {...props}>
            <FormLayout style={{ margin: 20 }}>
                <FormItem top="📝 Введите имя шаблона">
                    <Input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                </FormItem>
                <FormItem>
                    <Button
                        size="l"
                        stretched
                        mode="primary"
                        onClick={() => {}}
                        disabled={!templateName}
                    >
                        Сохранить
                    </Button>
                </FormItem>
            </FormLayout>
        </ModalPage>
    );
};
