import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import MeasurementType, { MeasurementInputType } from './measurement';

const zeroIfNull = (v) => (v != null ? v : { value: 0, unit: null });

const FatType = new GraphQLObjectType({
  name: 'FatType',
  fields: {
    saturated: {
      type: MeasurementType,
      description: 'Fat containing a high proportion of fatty acid molecules without double bonds, considered to be less healthy in the diet than unsaturated fat.',
      resolve(obj) {
        return zeroIfNull(obj.saturated);
      },
    },
    polyunsaturated: {
      type: MeasurementType,
      description: 'Fat molecules that have more than one unsaturated carbon bond in the molecule - also called a double bond. Polyunsaturated fats can help reduce bad cholesterol levels in your blood which can lower your risk of heart disease and stroke.',
      resolve(obj) {
        return zeroIfNull(obj.polyunsaturated);
      },
    },
    monounsaturated: {
      type: MeasurementType,
      description: 'Monounsaturated fatty acids are fatty acids that have one double bond in the fatty acid chain with all of the remainder carbon atoms being single-bonded.',
      resolve(obj) {
        return zeroIfNull(obj.monounsaturated);
      },
    },
    trans: {
      type: MeasurementType,
      description: 'Trans fat, also called unsaturated fatty acids or trans fatty acids, is a type of unsaturated fat that occurs in small amounts in nature, but became widely produced industrially from vegetable fats starting in the 1950s for use in margarine, snack food, packaged baked goods, and for frying fast food.',
      resolve(obj) {
        return zeroIfNull(obj.trans);
      },
    },
    total: {
      type: MeasurementType,
      description: 'Total amount of fat.',
      resolve(obj) {
        return zeroIfNull(obj.total);
      },
    },
  },
});

const CarbohydrateType = new GraphQLObjectType({
  name: 'CarbohydrateType',
  fields: {
    sugar: {
      type: MeasurementType,
      description: 'Sugars are the smallest type of carbohydrate and include single sugars and those with two sugar molecules joined together.',
      resolve(obj) {
        return zeroIfNull(obj.sugar);
      },
    },
    dietaryFiber: {
      type: MeasurementType,
      description: 'Dietary fiber is made up of many sugar molecules linked together. But unlike starches, fiber is bound together in such a way that it cannot be readily digested. There are two types of dietary fiber: soluble and insoluble.',
      resolve(obj) {
        return zeroIfNull(obj.dietaryFiber);
      },
    },
    starch: {
      type: MeasurementType,
      description: 'Starches are made up of many of glucose molecules linked together into long chains.',
      resolve(obj) {
        return zeroIfNull(obj.startch);
      },
    },
    sugarAlcohols: {
      type: MeasurementType,
      description: 'Sugar alcohols are carbohydrates that chemically have characteristics of both sugars and alcohols.',
      resolve(obj) {
        return zeroIfNull(obj.sugarAlcohols);
      },
    },
    total: {
      type: MeasurementType,
      description: 'Carbohydrate is one of three macronutrients in food that provide calories, or “energy,” for the body. Each gram of carbohydrate provides 4 calories.',
      resolve(obj) {
        return zeroIfNull(obj.total);
      },
    },
  },
});

const VitaminType = new GraphQLObjectType({
  name: 'VitaminType',
  fields: {
    A: {
      type: MeasurementType,
      description: 'Vitamin A is important for vision. It helps the retina of the eye to function properly, particularly at night.',
      resolve(obj) {
        return zeroIfNull(obj.A);
      },
    },
    B: {
      type: MeasurementType,
      description: 'Thiamine (B/B1) was the first to be discovered. It is essential for heart health and for the brain and nervous system to function properly.',
      resolve(obj) {
        return zeroIfNull(obj.B);
      },
    },
    B6: {
      type: MeasurementType,
      description: 'B6 helps the body to convert fat and carbohydrates into energy, and it contributes to healthy skin, hair and eyes. Vitamin B6 is also involved in brain development of the fetus during pregnancy and infancy, and it helps the immune system to function well. It is sometimes used as a treatment for morning sickness.',
      resolve(obj) {
        return zeroIfNull(obj.B6);
      },
    },
    B12: {
      type: MeasurementType,
      description: 'Vitamin B-12 is a crucial B vitamin. It is needed for nerve tissue health, brain function, and the production of red blood cells. Cobalamin is another name for vitamin B-12.',
      resolve(obj) {
        return zeroIfNull(obj.B12);
      },
    },
    C: {
      type: MeasurementType,
      description: 'Practically a celebrity in the world of vitamins, almost everybody reaches for a vitamin C pill at the first sign of a cold. Besides increasing the production of disease-fighting white blood cells and antibodies, thereby boosting the immune system, vitamin C is helpful in maintaining good eyesight.',
      resolve(obj) {
        return zeroIfNull(obj.C);
      },
    },
    D: {
      type: MeasurementType,
      description: 'The sunshine vitamin plays a key role in bone health. Low levels of vitamin D are linked with a growing list of health problems, including multiple sclerosis, osteoporosis, osteoarthritis, rickets, heart disease, diabetes, depression and several kinds of cancers.',
      resolve(obj) {
        return zeroIfNull(obj.D);
      },
    },
  },
});

const NutritionType = new GraphQLObjectType({
  name: 'NutritionType',
  fields: {
    protein: {
      type: MeasurementType,
      description: 'Protein is a macronutrient that is essential to building muscle mass.',
      resolve(obj) {
        return zeroIfNull(obj.protein);
      },
    },
    fat: {
      type: FatType,
      description: 'Fat, one of the three macro-nutrients, are an essential part of our diet and is important for good health.',
    },
    carbohydrate: {
      type: CarbohydrateType,
      description: 'Carbohydrate is one of three macronutrients in food that provide calories, or “energy,” for the body. Each gram of carbohydrate provides 4 calories.',
    },
    cholestrol: {
      type: MeasurementType,
      description: 'Cholesterol is a waxy, fat-like substance that\'s found in all the cells in your body. Your body needs some cholesterol to make hormones, vitamin D, and substances that help you digest foods. Our body makes all the cholesterol it needs.',
      resolve(obj) {
        return zeroIfNull(obj.cholestrol);
      },
    },
    sodium: {
      type: MeasurementType,
      description: 'Sodium is a mineral that occurs naturally in foods or is added during manufacturing - or both.',
      resolve(obj) {
        return zeroIfNull(obj.sodium);
      },
    },
    potassium: {
      type: MeasurementType,
      desdcription: 'Potassium is a mineral that, among other things, helps muscles contract, helps regulate fluids and mineral balance in and out of body cells, and helps maintain normal blood pressure by blunting the effect of sodium.',
      resolve(obj) {
        return zeroIfNull(obj.potassium);
      },
    },
    vitamin: {
      type: VitaminType,
      description: 'Vitamins are organic compounds that are needed in small quantities to sustain life.',
    },
    calcium: {
      type: MeasurementType,
      desdcription: 'Calcium is a mineral that is necessary for life. In addition to building bones and keeping them healthy, calcium enables our blood to clot, our muscles to contract, and our heart to beat.',
      resolve(obj) {
        return zeroIfNull(obj.calcium);
      },
    },
    iron: {
      type: MeasurementType,
      description: 'Iron is a mineral, and its main purpose is to carry oxygen in the hemoglobin of red blood cells throughout the body so cells can produce energy.',
      resolve(obj) {
        return zeroIfNull(obj.iron);
      },
    },
    magnesium: {
      type: MeasurementType,
      description: 'Magnesium is a mineral that\'s crucial to the body\'s function. Magnesium helps keep blood pressure normal, bones strong, and the heart rhythm steady.',
      resolve(obj) {
        return zeroIfNull(obj.magnesium);
      },
    },
  },
});

const FoodType = new GraphQLObjectType({
  name: 'FoodType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the food.',
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    createDate: { type: GraphQLDate },
    lastUpdated: { type: GraphQLDate },
    version: { type: GraphQLInt },
    nutrition: { type: NutritionType },
    servingSize: { type: MeasurementType },
    calories: {
      type: GraphQLFloat,
      resolve(obj) {
        return zeroIfNull(obj.calories);
      },
    },
  },
});

const CarbohydrateInputType = new GraphQLInputObjectType({
  name: 'CarbohydrateInputType',
  fields: {
    sugar: { type: MeasurementInputType },
    dietaryFiber: { type: MeasurementInputType },
    starch: { type: MeasurementInputType },
    sugarAlcohols: { type: MeasurementInputType },
    total: { type: MeasurementInputType },
  },
});

const VitaminInputType = new GraphQLInputObjectType({
  name: 'VitaminInputType',
  fields: {
    A: { type: MeasurementInputType },
    B: { type: MeasurementInputType },
    B6: { type: MeasurementInputType },
    B12: { type: MeasurementInputType },
    C: { type: MeasurementInputType },
    D: { type: MeasurementInputType },
  },
});

const FatInputType = new GraphQLInputObjectType({
  name: 'FatInputType',
  fields: {
    saturated: { type: MeasurementInputType },
    polyunsaturated: { type: MeasurementInputType },
    monounsaturated: { type: MeasurementInputType },
    trans: { type: MeasurementInputType },
    total: { type: MeasurementInputType },
  },
});

const NutritionInputType = new GraphQLInputObjectType({
  name: 'NutritionInputType',
  fields: {
    protein: { type: MeasurementInputType },
    fat: { type: FatInputType },
    carbohydrate: { type: CarbohydrateInputType },
    cholestrol: { type: MeasurementInputType },
    sodium: { type: MeasurementInputType },
    potassium: { type: MeasurementInputType },
    vitamin: { type: VitaminInputType },
    calcium: { type: MeasurementInputType },
    iron: { type: MeasurementInputType },
    magnesium: { type: MeasurementInputType },
    cobalamin: { type: MeasurementInputType },
  },
});

export const FoodInputType = new GraphQLInputObjectType({
  name: 'FoodInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    servingSize: { type: MeasurementInputType },
    calories: { type: GraphQLFloat },
    nutrition: { type: NutritionInputType },
  },
});

export default FoodType;
