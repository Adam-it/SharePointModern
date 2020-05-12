export default class propertyPaneValidators {
    
    public static validateTextField1(value: string): string {
        if (value === null || value.trim().length === 0) {
          return 'Provide a value';
        }
    
        if (value.length > 100) {
          return 'value should not be longer than 100 characters';
        }
    
        return '';
    }

    public static validateTextField2(value: string): string {
        if (value === null || value === "notAllowed") {
          return 'value may not be notAllowed';
        }
    
        return '';
    }
}