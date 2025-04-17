import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { COLORS } from '../../../themes/palette';

interface Plan {
    id: number;
    plan: string;
    price: number;
    duration: number;
    active: number;
}

const PlansList = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('https://ashhari.com/bbn/public/api/show_plans');
                setPlans(response.data.data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const renderPlan = ({ item }: { item: Plan }) => (
        <View style={[styles.card, item.active ? styles.activeCard : styles.inactiveCard]}>
            <Text style={styles.planName}>{item.plan.toUpperCase()}</Text>
            <Text style={styles.planDetails}>
                Price: ${item.price} | Duration: {item.duration} {item.duration > 1 ? 'months' : 'month'}
            </Text>
            <TouchableOpacity style={styles.subscribeButton}>
                <Text style={styles.subscribeText}>{item.active ? 'Subscribed' : 'Subscribe'}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.DARK} />
            ) : (
                <FlatList
                    data={plans}
                    renderItem={renderPlan}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.OFFWHITE,
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    activeCard: {
        borderColor: COLORS.GREEN,
        borderWidth: 1,
    },
    inactiveCard: {
        borderColor: COLORS.LIGHT_GRAY,
        borderWidth: 1,
    },
    planName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.DARK,
        marginBottom: 10,
    },
    planDetails: {
        fontSize: 14,
        color: COLORS.DARK_GRAY,
        marginBottom: 15,
    },
    subscribeButton: {
        backgroundColor: COLORS.DARK,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    subscribeText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PlansList;
